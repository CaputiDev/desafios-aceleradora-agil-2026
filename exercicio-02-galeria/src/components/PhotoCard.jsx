import React from 'react';

const PhotoCard = ({ url, nome }) => {
    return (
        <div className="photo-card">
            <img src={url} alt={nome} />
            <h3>{nome}</h3>
        </div>
    );
};

export default PhotoCard;