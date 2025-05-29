import './ReviewCard.scss'
import { FaUser } from 'react-icons/fa';

function ReviewCard({ data }) {
  return (
    <div className="review-card mb-3 p-3 shadow-sm">
        <div className='top'>

            <h5 className='icon'>
                <FaUser style={{ padding:"0.5rem",marginRight: '8px', color: '#555' ,fontSize:'5rem',border:'1px solid white' ,borderRadius:'50%'}} />
            </h5>
            <h5>{data.author_details.name || data.author}</h5>
            {data.author_details.rating && (
                <p>⭐ {data.author_details.rating}/10</p>
            )}
        </div>
      
      <p>{data.content.slice(0, 500)}</p>
      <p>
        {new Date(data.created_at).toLocaleDateString()}
      </p>
      
    </div>
  )
}

export default ReviewCard;

