import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './Join.css'

export default function SignIn() {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('Sales')

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <select
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
            value={room}
          >
            <option value="IT" selected>
              IT
            </option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
          </select>
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className={'button mt-20'} type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  )
}
