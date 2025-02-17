import React, { useState, useEffect } from 'react';

interface DogImageResponse {
  message: string;
  status: string;
}

const DogImage: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDogImage = async () => {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: DogImageResponse = await response.json();
        if (data.status === 'success') {
          setImageUrl(data.message);
        } else {
          throw new Error(`API error: ${data.status}`);
        }
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    };

    fetchDogImage();
  }, []);

  if (loading) {
    return <div>Загрузка изображения...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div>
      <h1>Случайное изображение собаки</h1>
      {imageUrl && <img src={imageUrl} alt="Случайная собака" style={{ maxWidth: '500px' }} />}
    </div>
  );
};

export default DogImage;