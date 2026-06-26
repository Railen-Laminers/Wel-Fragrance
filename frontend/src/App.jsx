import { bgImages, modelImages, productImages } from './assets/images'

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Image assets ready</h1>
      <p>Background image: {bgImages.wel ? 'loaded' : 'missing'}</p>
      <p>Models count: {Object.keys(modelImages).length}</p>
      <p>Products count: {Object.keys(productImages).length}</p>
    </div>
  )
}

export default App
