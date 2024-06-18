
const ProductCard = ({ item, convertToBase64 }) => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        convertToBase64(item.ProductImage.Data.data, item.ProductImage.contentType).then(base64 => {
            setImageSrc(base64);
        });
    }, [item, convertToBase64]);

    return (
        <div>
            <h2>{item.name}</h2>
            {imageSrc ? <img src={imageSrc} alt={item.name} /> : <p>Loading image...</p>}
        </div>
    );
};

return 