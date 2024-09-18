import React, { useState, useEffect } from 'react';
import RecipeList from './components/RecipeList';

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // beforeinstallprompt olayını dinliyoruz
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Kullanıcı uygulamayı yüklemeyi kabul etti.');
        } else {
          console.log('Kullanıcı uygulamayı yüklemeyi reddetti.');
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Kahve Tarifleri</h1>
      <RecipeList />
      {deferredPrompt && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={handleInstallClick}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Uygulamayı Yükle
          </button>
        </div>
      )}
    </div>
  );
}

export default App;