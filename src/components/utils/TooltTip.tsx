import "../../css/Toltip.css"

type TooltipProps = {
  message?: string,
  children: JSX.Element
}

const TooltTip = ({message, children}: TooltipProps) => {
  return (
    <div className='tooltip-wrapper'>
      <div className="tooltip-children">
        {children}
        <div className="tooltip-message">
          {message || "I am tooltip."}
        </div>
      </div>
    </div>
  )
}

export default TooltTip
