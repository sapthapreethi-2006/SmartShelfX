import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNextProductCode } from '../../Services/ProductService';

const NewEntry = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const go = async () => {
      try {
        const code = await getNextProductCode();
        if (code) {
          window.localStorage.setItem('productCode', code);
        }
      } catch (e) {
        // ignore; ProductEntry will fetch if not present
      } finally {
        navigate('/product-entry', { replace: true });
      }
    };
    go();
  }, [navigate]);

  return null;
};

export default NewEntry;
