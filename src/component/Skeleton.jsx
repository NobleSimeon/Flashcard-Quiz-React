import "./skeleton.css"

export default function Skeleton({ amount = 10 }) {
    const skeletons = Array.from({ length: amount }, (_, i) => (
      <div className="skeleton-container" key={i}>
        <div className="skeleton skeleton-heading"></div>
        <div className="skeleton skeleton-question"></div>
        <div className="skeleton skeleton-question"></div>
        <div className="skeleton skeleton-question"></div>
        <div className="skeleton skeleton-question"></div>
        <span className="skeleton skeleton-difficulty"></span>
        <span className="skeleton skeleton-type"></span>
        <div className="skeleton-flashcard-options">
          <div className="skeleton skeleton-flashcard-option"></div>
          <div className="skeleton skeleton-flashcard-option"></div>
          <div className="skeleton skeleton-flashcard-option"></div>
          <div className="skeleton skeleton-flashcard-option"></div>
        </div>
      </div>
    ));
  
    return <div className="card-grid">{skeletons}</div>;
  }
  

const loaderStyles = {
    width: '40px',
    aspectRatio: '2',
    background: `
      no-repeat radial-gradient(circle closest-side, #000 90%, #0000) 0%   50%,
      no-repeat radial-gradient(circle closest-side, #000 90%, #0000) 50%  50%,
      no-repeat radial-gradient(circle closest-side, #000 90%, #0000) 100% 50%
    `,
    backgroundSize: 'calc(100%/3) 50%',
    animation: 'l3 1s infinite linear',
  };
  

const keyframes = `
    @keyframes l3 {
    20%{background-position:0%   0%, 50%  50%,100%  50%}
    40%{background-position:0% 100%, 50%   0%,100%  50%}
    60%{background-position:0%  50%, 50% 100%,100%   0%}
    80%{background-position:0%  50%, 50%  50%,100% 100%}
}`;

  /* HTML: <div class="loader"></div> */


export function Loading() {
  return (
    <>
      <style>{keyframes}</style>
      <div style={loaderStyles} className="loader"></div>
    </>
  );
}
