export default function SearchBar({ city, setCity, onSearch }) {
  return (
    <div className="search">
      <input
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
}
