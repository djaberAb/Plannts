import React from 'react';

const PlantPage: React.FC = () => {
    return (
        <div className="product-page">
            <div className="product-image">
                <img src="plant-image.jpg" alt="Plant" />
            </div>
            <div className="product-details">
                <h1>Plant Name</h1>
                <p>Price: $19.99</p>
                <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae semper nisl. Nullam auctor, justo a ultrices aliquet, nunc nunc tincidunt urna, sed tincidunt nunc nunc id nunc.</p>
                <button className="buy-now-button">Buy Now</button>
            </div>
        </div>
    );
};

export default PlantPage;