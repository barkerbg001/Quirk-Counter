import { memo } from 'react';
import './CategoryCard.css';

function CategoryCard({ 
    category, 
    categoryName, 
    isPulsing, 
    isDragging,
    isDragOver,
    onIncrement, 
    onDecrement, 
    onDelete,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDragLeave,
    onDrop
}) {
    return (
        <div 
            className={`card ${isPulsing ? 'pulse' : ''} ${isDragging ? 'dragging' : ''} ${isDragOver ? 'drag-over' : ''}`}
            data-category-id={category.id}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            <div className="card-title">{categoryName}</div>
            <div className="card-count">{category.count}</div>
            <button
                className="delete-category-button"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onDragStart={(e) => e.stopPropagation()}
                aria-label={`Delete ${categoryName}`}
                title="Delete category"
            >
                <span className="material-icons">delete</span>
            </button>
            <div className="card-buttons">
                <button
                    className="minus-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDecrement();
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onDragStart={(e) => e.stopPropagation()}
                    disabled={category.count === 0}
                    aria-label={`Remove one from ${categoryName}`}
                >
                    −
                </button>
                <button
                    className="add-button"
                    onClick={() => onIncrement()}
                    onMouseDown={(e) => e.stopPropagation()}
                    onDragStart={(e) => e.stopPropagation()}
                    aria-label={`Add one to ${categoryName}`}
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default memo(CategoryCard);

