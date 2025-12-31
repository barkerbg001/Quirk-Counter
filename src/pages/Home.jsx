import { useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import './Home.css';

function Home({ appState, showToast, showDialog }) {
    const [pulsingCard, setPulsingCard] = useState(null);

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

    if (!appState.isInitialized) {
        return <div>Loading...</div>;
    }

    return (
        <div className="page active">
            <div className="cards-container">
                {appState.categories.map(category => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                        categoryName={appState.getCategoryName(category.id)}
                        isPulsing={pulsingCard === category.id}
                        onIncrement={() => handleIncrement(category.id)}
                        onDecrement={() => handleDecrement(category.id)}
                        onDelete={() => handleDelete(category.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;

