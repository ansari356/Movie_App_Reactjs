import './DetailsCard.scss';

function DetailsCard({ data, type }) {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  
  return (
    <div className="details-container">
      <div className="details-card">
        <div className="details-grid">
          <div className="poster">
            <img
              src={IMAGE_PATH + data.poster_path}
              alt={type === "movie" ? data.title : data.name}
            />
          </div>
          <div className="details-content">
            <h2>{type === "movie" ? data.title : data.name}</h2>
            <p className="tagline">{data.tagline}</p>
            <p className="release-date">
              {type === "movie" ? data.release_date : data.first_air_date}
            </p>
            <p className="rating">⭐ {data.vote_average} ({data.vote_count} votes)</p>
            <p className="overview">{data.overview}</p>

            <div className="info-row">
              <p><strong>Duration:</strong> {type === "movie" ? data.runtime : data.episode_run_time[0]} min</p>
              <p><strong>Language:</strong> {data.original_language.toUpperCase()}</p>
            </div>

            <div className="genres">
              {data.genres.map((g, i) => (
                <span key={i} className="genre">{g.name}</span>
              ))}
            </div>

            {data.homepage && (
              <a href={data.homepage} target="_blank" rel="noreferrer" className="official-link">
                Visit Official Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsCard;
