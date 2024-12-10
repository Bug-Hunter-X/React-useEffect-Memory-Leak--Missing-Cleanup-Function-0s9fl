```javascript
function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController(); //added
    const signal = controller.signal; //added
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data', {signal});
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
    return () => { 
      controller.abort(); //added
    };
  }, []);

  return <div>Count: {count}</div>;
}
```