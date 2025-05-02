"use client"

import { useState } from "react"
import "./tag-input.css"

export default function TagInput({ tags, setTags, placeholder, hasError }) {
  const [inputValue, setInputValue] = useState("")

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleInputKeyDown = (e) => {
    // Add tag on Enter or comma
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault()
      addTag(inputValue)
    }
    // Remove last tag on Backspace if input is empty
    else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1)
    }
  }

  const handleBlur = () => {
    if (inputValue.trim()) {
      addTag(inputValue)
    }
  }

  const addTag = (text) => {
    const tagText = text.trim().replace(/,/g, "")
    if (tagText && !tags.includes(tagText)) {
      setTags([...tags, tagText])
    }
    setInputValue("")
  }

  const removeTag = (index) => {
    const newTags = [...tags]
    newTags.splice(index, 1)
    setTags(newTags)
  }

  return (
    <div className={`tag-input-container ${hasError ? "has-error" : ""}`}>
      <div className="tag-input-wrapper">
        {tags.map((tag, index) => (
          <div key={index} className="tag">
            <span className="tag-text">{tag}</span>
            <button type="button" className="tag-remove" onClick={() => removeTag(index)} aria-label={`Remove ${tag}`}>
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleBlur}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="tag-input"
        />
      </div>
    </div>
  )
}
