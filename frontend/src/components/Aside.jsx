import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faTrash,
  faStar,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
function Aside() {
  return (
    <div>

<aside className="w-64 border-r bg-gray-50">
        <div className="p-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full mb-4">
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            <Link to="/compose">Compose</Link>
          </button>
          <nav>
            <a
              href="#"
              className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md"
            >
              <FontAwesomeIcon icon={faClock} className="mr-3" />
              <Link to='/recent-emails'>Recent</Link>
              
            </a>
            <a
              href="#"
              className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md"
            >
              <Link to='/important-emails'>
                <FontAwesomeIcon icon={faStar} className="mr-3" />
                Important
              </Link>
            </a>
            <a
              href="#"
              className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md"
            >
              <FontAwesomeIcon icon={faTrash} className="mr-3" />
              Trash
            </a>
          </nav>
        </div>
      </aside>
    </div>
  )
}

export default Aside