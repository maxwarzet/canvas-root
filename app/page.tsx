"use client"

import { useRef, useEffect, useCallback } from "react"

// --- Canvas and Grid Constants ---
const ARROW_SPACING = 50 // Distance between arrow centers in the grid (adjust for density)
const BLUR_ALPHA = 0.1 // Alpha for the semi-transparent clear (higher = less blur/cleaner trail)

// --- Line Arrow Appearance Constants ---
const ARROW_LENGTH = 12 // Length of the main arrow line
const ARROWHEAD_SIZE = 4 // Size of the arrowhead lines
const LINE_STROKE_WIDTH = 0.2 // Stroke width for the line arrow (adjust for boldness)

// --- Opacity Fade Effect Constants ---
const FADE_START_DISTANCE = 100 // Distance from mouse where arrows start to fade (pixels)
const FADE_END_DISTANCE = 200 // Distance from mouse where arrows reach MIN_OPACITY (pixels)
const MIN_OPACITY = 0.01 // Minimum opacity for arrows far from the mouse
const MAX_OPACITY = 1.0 // Maximum opacity for arrows near the mouse

// --- Smooth Movement Constant ---
const SMOOTHING_FACTOR = 0.05 // Smoothing factor for arrow rotation (0.0 to 1.0, smaller = smoother/slower)

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | null>(null)

  // Ref for the target mouse position, which arrows will point towards
  const targetMousePos = useRef({ x: 0, y: 0 })

  // Ref to store the fixed positions and current angles of all arrows in the grid
  const arrowGridPositions = useRef<{ x: number; y: number; currentAngle: number }[]>([])

  /**
   * Draws a line arrow on the canvas context.
   * The arrow's base is at (x, y), and it points in the direction of 'angle'.
   */
  const drawArrow = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, angle: number) => {
    ctx.save() // Save the current canvas state (transformations)

    // Translate the canvas origin to the arrow's base position
    ctx.translate(x, y)
    // Rotate the canvas so the arrow points in the correct direction
    // The line arrow is drawn pointing right (0 radians), so we just rotate by the calculated angle.
    ctx.rotate(angle)

    ctx.strokeStyle = "white" // Changed back to white
    ctx.lineWidth = LINE_STROKE_WIDTH

    // Draw the main line of the arrow
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(ARROW_LENGTH, 0)
    ctx.stroke()

    // Draw the arrowhead
    ctx.beginPath()
    ctx.moveTo(ARROW_LENGTH, 0)
    ctx.lineTo(ARROW_LENGTH - ARROWHEAD_SIZE, -ARROWHEAD_SIZE / 2)
    ctx.moveTo(ARROW_LENGTH, 0)
    ctx.lineTo(ARROW_LENGTH - ARROWHEAD_SIZE, ARROWHEAD_SIZE / 2)
    ctx.stroke()

    ctx.restore() // Restore the canvas state to what it was before this function call
  }, []) // Dependencies are stable constants, so useCallback is effective

  /**
   * Sets canvas dimensions and calculates fixed grid positions for arrows.
   * This function is called on initial mount and window resize.
   */
  const setCanvasAndGrid = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const newGridPositions: { x: number; y: number; currentAngle: number }[] = []
    // Calculate starting offset to center the grid
    const offsetX = (canvas.width % ARROW_SPACING) / 2
    const offsetY = (canvas.height % ARROW_SPACING) / 2

    for (let y = ARROW_SPACING / 2 + offsetY; y < canvas.height; y += ARROW_SPACING) {
      for (let x = ARROW_SPACING / 2 + offsetX; x < canvas.width; x += ARROW_SPACING) {
        // Initialize currentAngle for each arrow (e.g., to 0 for a consistent start)
        newGridPositions.push({ x, y, currentAngle: 0 })
      }
    }
    arrowGridPositions.current = newGridPositions
  }, []) // No dependencies, so this function is stable

  /**
   * The main animation loop.
   * Clears the canvas with a semi-transparent color for motion blur,
   * and redraws all arrows in the grid, pointing towards the mouse.
   */
  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Apply motion blur: fill the entire canvas with a semi-transparent black.
    // This gradually fades out previous frames, creating a trail effect.
    ctx.fillStyle = `rgba(0, 0, 0, ${BLUR_ALPHA})` // Changed back to black
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Iterate through each arrow in the grid
    arrowGridPositions.current.forEach((arrow) => {
      // Calculate the target angle for the current arrow to point towards the mouse
      const dx = targetMousePos.current.x - arrow.x
      const dy = targetMousePos.current.y - arrow.y
      const targetAngle = Math.atan2(dy, dx) // Returns angle in radians

      // Calculate the difference between target and current angle
      let angleDiff = targetAngle - arrow.currentAngle

      // Normalize angleDiff to be within -PI to PI (shortest path rotation)
      if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI
      if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI

      // Smoothly interpolate the current angle towards the target angle
      arrow.currentAngle += angleDiff * SMOOTHING_FACTOR

      // Normalize currentAngle to be within -PI to PI
      if (arrow.currentAngle > Math.PI) arrow.currentAngle -= 2 * Math.PI
      if (arrow.currentAngle < -Math.PI) arrow.currentAngle += 2 * Math.PI

      // Calculate distance from mouse for opacity effect
      const distance = Math.hypot(dx, dy)

      let opacity = MAX_OPACITY
      if (distance > FADE_START_DISTANCE) {
        // Calculate fade progress (0 to 1)
        const fadeProgress = Math.min(1, (distance - FADE_START_DISTANCE) / (FADE_END_DISTANCE - FADE_START_DISTANCE))
        // Interpolate opacity between MAX_OPACITY and MIN_OPACITY
        opacity = MAX_OPACITY - (MAX_OPACITY - MIN_OPACITY) * fadeProgress
      }
      // Ensure opacity is clamped within the desired range
      opacity = Math.max(MIN_OPACITY, Math.min(MAX_OPACITY, opacity))

      // Set global alpha for this arrow
      ctx.globalAlpha = opacity

      // Draw the arrow at its fixed grid position with its smoothly updated angle
      drawArrow(ctx, arrow.x, arrow.y, arrow.currentAngle)

      // Reset global alpha to 1.0 for subsequent drawing operations (like the blur fillRect)
      ctx.globalAlpha = 1.0
    })

    // Request the next animation frame to continue the loop
    animationFrameId.current = requestAnimationFrame(animate)
  }, [drawArrow]) // `animate` depends only on `drawArrow` which is stable

  /**
   * useEffect hook for setting up and tearing down canvas, event listeners, and animation.
   */
  useEffect(() => {
    // Set initial canvas size and generate grid positions
    setCanvasAndGrid()

    const handleMouseMove = (event: MouseEvent) => {
      targetMousePos.current = { x: event.clientX, y: event.clientY } // Update ref
    }

    window.addEventListener("resize", setCanvasAndGrid) // Recalculate grid on window resize
    window.addEventListener("mousemove", handleMouseMove) // Listen for mouse movement

    // Start animation
    animationFrameId.current = requestAnimationFrame(animate)

    // Cleanup function: runs when the component unmounts
    return () => {
      window.removeEventListener("resize", setCanvasAndGrid)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current) // Cancel any pending animation frame
      }
    }
  }, [animate, setCanvasAndGrid]) // `animate` and `setCanvasAndGrid` are stable callables

  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      {" "}
      {/* Changed back to bg-black */}
      <canvas ref={canvasRef} className="block" />
    </div>
  )
}
