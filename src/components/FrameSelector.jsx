import './css/FrameSelector.css';

function FrameSelector({ selectedFrame, onFrameSelect }) {
  const frames = [
    { id: 'frame1', name: 'Classic', preview: '/src/assets/frame1.png' },
    { id: 'frame2', name: 'Modern', preview: '/src/assets/frame2.png' },
    { id: 'frame3', name: 'Vintage', preview: '/src/assets/frame3.png' }
  ];

  return (
    <div className="frame-selector">
      <h3>Choose a Frame:</h3>
      <div className="frame-options">
        {frames.map(frame => (
          <button
            key={frame.id}
            className={`frame-option ${selectedFrame === frame.id ? 'selected' : ''}`}
            onClick={() => onFrameSelect(frame.id)}
          >
            <img 
              src={frame.preview} 
              alt={frame.name}
              className="frame-preview"
            />
            <span className="frame-name">{frame.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default FrameSelector;