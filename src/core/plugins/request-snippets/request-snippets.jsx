import React, { useRef, useEffect, useState } from "react"
import classNames from "classnames"
import PropTypes from "prop-types"
import { CopyToClipboard } from "react-copy-to-clipboard"

const style = {
  cursor: "pointer",
  lineHeight: 1,
  display: "inline-flex",
  backgroundColor: "rgb(250, 250, 250)",
  paddingBottom: "0",
  paddingTop: "0",
  border: "1px solid rgb(51, 51, 51)",
  borderRadius: "4px 4px 0 0",
  boxShadow: "none",
  borderBottom: "none"
}

const activeStyle = {
  cursor: "pointer",
  lineHeight: 1,
  display: "inline-flex",
  backgroundColor: "rgb(51, 51, 51)",
  boxShadow: "none",
  border: "1px solid rgb(51, 51, 51)",
  paddingBottom: "0",
  paddingTop: "0",
  borderRadius: "4px 4px 0 0",
  marginTop: "-5px",
  marginRight: "-5px",
  marginLeft: "-5px",
  zIndex: "9999",
  borderBottom: "none"
}

const RequestSnippets = ({ request, requestSnippetsSelectors, getComponent }) => {
  const rootRef = useRef(null)

  const ArrowIcon = getComponent("ArrowUpIcon")
  const ArrowDownIcon = getComponent("ArrowDownIcon")
  const SyntaxHighlighter = getComponent("SyntaxHighlighter", true)

  const [activeLanguage, setActiveLanguage] = useState(requestSnippetsSelectors.getSnippetGenerators()?.keySeq().first())
  const [isExpanded, setIsExpanded] = useState(requestSnippetsSelectors?.getDefaultExpanded())

  const snippetGenerators = requestSnippetsSelectors.getSnippetGenerators()
  const activeGenerator = snippetGenerators.get(activeLanguage)
  const snippet = activeGenerator.get("fn")(request)

  const handleGenChange = (key) => {
    const needsChange = activeLanguage !== key
    if (needsChange) {
      setActiveLanguage(key)
    }
  }

  const handleSetIsExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const handleGetBtnStyle = (key) => {
    if (key === activeLanguage) {
      return activeStyle
    }
    return style
  }

  const handlePreventYScrollingBeyondElement = (e) => {
    const { target, deltaY } = e
    const { scrollHeight: contentHeight, offsetHeight: visibleHeight, scrollTop } = target
    const scrollOffset = visibleHeight + scrollTop
    const isElementScrollable = contentHeight > visibleHeight
    const isScrollingPastTop = scrollTop === 0 && deltaY < 0
    const isScrollingPastBottom = scrollOffset >= contentHeight && deltaY > 0

    if (isElementScrollable && (isScrollingPastTop || isScrollingPastBottom)) {
      e.preventDefault()
    }
  }

  useEffect(() => {
    const doIt = () => {

    }
    doIt()
  }, [])

  useEffect(() => {
    const childNodes = Array
      .from(rootRef.current.childNodes)
      .filter(node => !!node.nodeType && node.classList?.contains("curl-command"))
    // eslint-disable-next-line no-use-before-define
    childNodes.forEach(node => node.addEventListener("mousewheel", handlePreventYScrollingBeyondElement, { passive: false }))

    return () => {
      // eslint-disable-next-line no-use-before-define
      childNodes.forEach(node => node.removeEventListener("mousewheel", handlePreventYScrollingBeyondElement))
    }
  }, [request])

  return (
    <div className="request-snippets" ref={rootRef}>
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center", marginBottom: "15px" }}>
        <h4
          onClick={() => handleSetIsExpanded()}
          style={{ cursor: "pointer" }}
        >Snippets</h4>
        <button
          onClick={() => handleSetIsExpanded()}
          style={{ border: "none", background: "none" }}
          title={isExpanded ? "Collapse operation" : "Expand operation"}
        >
          {isExpanded ? <ArrowDownIcon className="arrow" width="10" height="10" /> : <ArrowIcon className="arrow" width="10" height="10" />}
        </button>
      </div>
      {
        isExpanded && <div className="curl-command">
          <div style={{ paddingLeft: "15px", paddingRight: "10px", width: "100%", display: "flex" }}>
            {
              snippetGenerators.entrySeq().map(([key, gen]) => {
                return (
                  <div
                    className={classNames("btn", {"curl-command--active": key === activeLanguage })}
                    style={handleGetBtnStyle(key)}
                    key={key}
                    onClick={() => handleGenChange(key)}
                  >
                    <h4 style={key === activeLanguage ? { color: "white", } : {}}>{gen.get("title")}</h4>
                  </div>
                )
              })
            }
          </div>
          <div className="copy-to-clipboard">
            <CopyToClipboard text={snippet}>
              <button />
            </CopyToClipboard>
          </div>
          <div>
            <SyntaxHighlighter
              language={activeGenerator.get("syntax")}
              className="curl microlight"
              renderPlainText={({ children, PlainTextViewer }) => (
                <PlainTextViewer className="curl">{children}</PlainTextViewer>
              )}
            >
              {snippet}
            </SyntaxHighlighter>
          </div>
        </div>
      }
    </div>
  )
}

RequestSnippets.propTypes = {
  request: PropTypes.object.isRequired,
  requestSnippetsSelectors: PropTypes.object.isRequired,
  getComponent: PropTypes.func.isRequired,
  requestSnippetsActions: PropTypes.object,
}

export default RequestSnippets
