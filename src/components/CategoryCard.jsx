import { memo } from 'react';
import './CategoryCard.css';

function CategoryCard({ category, categoryName, isPulsing, onIncrement, onDecrement, onDelete }) {
    return (
        <div 
            className={`card ${isPulsing ? 'pulse' : ''}`}
            data-category-id={category.id}
        >
            <div className="card-title">{categoryName}</div>
            <div className="card-count">{category.count}</div>
            <button
                className="delete-category-button"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
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
                    disabled={category.count === 0}
                    aria-label={`Remove one from ${categoryName}`}
                >
                    −
                </button>
                <button
                    className="add-button"
                    onClick={() => onIncrement()}
                    aria-label={`Add one to ${categoryName}`}
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default memo(CategoryCard);

