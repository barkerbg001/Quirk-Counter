import { useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import './Home.css';

function Home({ appState, showToast, showDialog }) {
    const [pulsingCard, setPulsingCard] = useState(null);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);

    const handleIncrement = async (categoryId) => {
        const phrase = appState.incrementCategory(categoryId);
        showToast(phrase);
        
        // Pulse animation
        setPulsingCard(categoryId);
        setTimeout(() => setPulsingCard(null), 500);
    };

    const handleDecrement = (categoryId) => {
        const message = appState.decrementCategory(categoryId);
        if (message) {
            showToast(message);
        }
    };

    const handleDelete = async (categoryId) => {
        const categoryName = appState.getCategoryName(categoryId);
        const confirmed = await showDialog(`Delete category "${categoryName}"? This will remove all associated events.`);
        
        if (confirmed) {
            appState.deleteCategory(categoryId);
            showToast(`${categoryName} deleted`);
        }
    };

    const handleDragStart = (e, index) => {
        // Don't start drag if clicking on a button
        if (e.target.closest('button')) {
            e.preventDefault();
            return;
        }
        
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.currentTarget.outerHTML);
        e.currentTarget.classList.add('dragging');
    };

    const handleDragEnd = (e) => {
        e.currentTarget.classList.remove('dragging');
        setDraggedIndex(null);
        setDragOverIndex(null);
        // Remove drag-over class from all cards
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('drag-over');
        });
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        if (draggedIndex !== null && draggedIndex !== index) {
            setDragOverIndex(index);
            e.currentTarget.classList.add('drag-over');
        }
    };

    const handleDragLeave = (e) => {
        e.currentTarget.classList.remove('drag-over');
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setDragOverIndex(null);
        }
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        
        if (draggedIndex !== null && draggedIndex !== dropIndex) {
            appState.reorderCategories(draggedIndex, dropIndex);
            showToast('Categories reordered');
        }
        
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    if (!appState.isInitialized) {
        return <LoadingSpinner message="Loading your counters..." />;
    }

    return (
        <div className="page active">
            <div className="page-header-hero">
                <div className="page-header-hero-content">
                    <h1 className="page-header">Home</h1>
                    <p className="page-header-subtitle">
                        Track your quirky events with customizable categories. Drag and drop cards to reorganize them.
                    </p>
                </div>
            </div>
            <div className="cards-container">
                {appState.categories.map((category, index) => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                        categoryName={appState.getCategoryName(category.id)}
                        isPulsing={pulsingCard === category.id}
                        isDragging={draggedIndex === index}
                        isDragOver={dragOverIndex === index}
                        onIncrement={() => handleIncrement(category.id)}
                        onDecrement={() => handleDecrement(category.id)}
                        onDelete={() => handleDelete(category.id)}
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;

