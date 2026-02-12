import React,{useEffect,useState   } from "react";
import { useParams, useNavigate} from "react-router-dom";  
import { getProductById, getProductByCode } from '../../Services/ProductService';
import  {transactionIdGenerate, saveTransaction } from '../../Services/TransactionService';

const ProductStockEdit = () => {
    const [product, setProduct] = useState({
    productId: null,
    productCode: "",
    productName: "",
    skuId: "",
    purchasePrice: 0.0,
    salesPrice: 0.0,
    reorderLevel: 0,
    stock: 0,
    vendorId: "",
    status: true
  });

  const [newId, setNewId] = useState(0);//trans id
  const[errors,setErrors]=useState({});
  const [flag,setFlag]=useState("");//type of trans issue or purchsse
  const [userId,setUserId] = useState(1);//default user ID
  const [tdate,setTdate] = useState(new Date().toISOString().split('T')[0]);

  const [transaction,setTransaction] = useState({
        transactionId:0 ,
	    transactionType:"",
        productId:" ",
	    rate:0.0,
	    quantity:0.0,
	    transactionValue:0.0,
	    userId:"",
	    transactionDate:new Date()
    }


  );
  let navigate = useNavigate();
  let params=useParams();
  let [quantity,setQuantity]=useState(0.0);
  const [transValue,setTransValue]=useState(null);
  const [warns,setwarns]=useState(null);

  const setProductData = () => {
      // params.pid is the productCode (e.g., 'P1000') from route /edit-stock/:pid/:no
      console.log('Fetching product with code:', params.pid);
      getProductByCode(params.pid).then(response => {
      console.log('Product fetched:', response);
      setProduct(response);
      setFlag(parseInt(params.no));
    }).catch(err => {
      console.error('Error fetching product:', err);
      alert('Failed to load product details');
    });
  }

  const setTransactionId=()=>{
    transactionIdGenerate().then(response=>{
        setNewId(response.data);
    });
  }

  useEffect(()=>{
  setProductData();
  setTransactionId();
  },[]);

  const returnback=()=>{
    navigate('/product-list');
  }
  const clearAll=()=>{
    setQuantity(0.0);
    setTransValue(0.0);
    setErrors({});
  }

  const stockEdit = (event)=>{
    event.preventDefault();
    
    // Build transaction object with proper types
    let transactionType = flag === 1 ? "IN" : "OUT";
    let rate = flag === 1 ? product.purchasePrice : product.salesPrice;
    let transactionValue = parseFloat(rate) * parseFloat(quantity);
    
    const transactionData = {
      transactionId: parseInt(newId),
      transactionType: transactionType,
      productId: parseInt(product.productId),
      rate: parseFloat(rate),
      quantity: parseFloat(quantity),
      transactionValue: transactionValue,
      userId: parseInt(userId) || 0,
      transactionDate: tdate
    };
    
    setTransValue(transactionValue);

    if (flag === 2) {
      let balance = product.stock - parseFloat(quantity);
      if (balance < product.reorderLevel) {
        setwarns("Stock reached to ReOrder Level!.......");
      }
    }

    // Send transaction to backend
    console.log('Sending transaction data:', transactionData);
    saveTransaction(transactionData).then(response => {
      console.log('Transaction response:', response);
      // Transaction saved successfully - no alert, keep everything visible
    }).catch(error => {
      console.error('Error saving transaction:', error);
      console.error('Error response:', error.response?.data);
      alert('Error saving transaction: ' + (error.response?.data?.message || error.message));
    });
  }

  const handleValidation=(event)=>{  
    event.preventDefault();
    let tempErrors={};
    let isValid=true;
    if(!toString(quantity).trim())
    {
      isValid=false;
      tempErrors.quantity="Transaction quantity is required";
    }
    else if(parseFloat(quantity)<=0)
    {
      isValid=false;
      tempErrors.quantity="Transaction quantity cannot be zero or negative";
    }

    if(flag===2){
      if(parseFloat(quantity)>product.stock)
      {
        isValid=false;
        tempErrors.quantity="Issued quantity cannot be more than stock";
      }
    }



    setErrors(tempErrors);
    if(isValid){
      stockEdit(event);
    }
  

};
return (
  <div>
    <div className = "col-md-12 text-center" style={{textAlign:"center"}} >
      {
        parseInt(flag)===1 ? <h3 className="text-center"><u>Stock Purchase Entry</u></h3>: <h3 className="text-center"><u>Stock Issue Entry</u></h3>
      }
      {/* Debug: Show raw product data */}
      <div style={{display: 'none'}}>{JSON.stringify(product)}</div>
    </div>
    <div className = "card col-md-6 offset-md-3">
     <div className = "card-body" align="center">
        <table className="table table-bordered">
          <tbody>
          <tr>
              <td> Product Id:</td>
              <td>{product.productCode || product.productId || 'N/A'}</td>
          </tr>
          <tr>
              <td> SKU Id: </td>
              <td>{product.skuId || 'N/A'} </td>
          </tr>
          <tr>
              <td> Product Name:</td>
              <td>{product.productName || 'N/A'} </td>
          </tr>
          <tr>
              <td>
                {
                  parseInt(flag)===1 ? <>Purchase-Price:</>:<>Sales-Price:</>
                }
               </td>
               <td>
                {
                  parseInt(flag)===1 ? product.purchasePrice:product.salesPrice
                }
               </td>
          </tr>
          <tr>                      
              <td> Re Order Level: </td>
              <td>{product.reorderLevel || 'N/A'} </td>
          </tr>
          <tr>
              <td> Stock:</td>
              <td> {product.stock || '0'} </td>
          </tr>
          <tr>
              <td> Vendor:</td>
              <td>{product.vendorId || 'N/A'} </td>
          </tr>
          </tbody>
      </table>
     </div>
    </div>
    <div className = "card col-md-6 offset-md-3">
    <div className="card-body" align="center">
      <form>
        <div className="row">
          <div className = "form-group">
              <label>Transaction Id: </label>
              <input  name="transactionId" className="form-control" value={newId} readOnly/>
               <label> Select Transaction Date: </label>
               <input type="date" placeholder="yyyy-mm-dd"  className="form-control" value={tdate} onChange={(event)=>setTdate(event.target.value)}/>  
               
           </div>
           <div className = "form-group">
                <b>
                {
                parseInt(flag)===1 ? <label>Enter Purchased Stock Quantity: </label>: <label>Enter Issued Stock Quantity: </label>
                }
                </b>
              <input placeholder="quantity" name="quantity" className="form-control" value={quantity} onChange={(event)=>setQuantity(event.target.value)}/>
              {errors.quantity && <p style={{ color: "red" }}>{errors.qty}</p>}
          </div>  
          <div>
               <button className="btn btn-success" onClick={handleValidation}>Save</button>
               &nbsp;&nbsp;  <button className="btn btn-secondary" onClick={clearAll}>Reset</button>
               &nbsp;&nbsp; &nbsp;&nbsp;<button className="btn btn-success" onClick={returnback}>Return</button>                    
         </div>
         </div>
         </form>
        {transValue !== null && (
         <div style={{textAlign: "center",}}><b>Transaction Value: ₹{transValue}</b>
    </div>
        )}
     {warns !== null && (
      <div style={{textAlign: "center",color:"red"}}>
   <b>{warns}</b>
 </div>
  )}
     
   </div>
 </div>
</div>
   
);
}

  export default ProductStockEdit;