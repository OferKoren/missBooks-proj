const { useState, useEffect } = React
export function LongTxt({ txt = '', length = 100 }) {
    const [isFullLength, setFullLength] = useState(false)
    const buttonContent = isFullLength ? 'show less' : 'show more'

    const shownTxt = isFullLength ? txt : `${txt.substring(0, length)}...`
    return (
        <div className="long-txt">
            <div>{shownTxt}</div>
            <button onClick={() => setFullLength((prevLength) => !prevLength)}>{buttonContent}</button>
        </div>
    )
}
