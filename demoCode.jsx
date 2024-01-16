
   //define web component ATMDeposit
   //it is a fucntional component
   //it is the child of the Account component
   //it contains the html code for the input fields for deposit
   //always start with capital letter to define web component
    const ATMDeposit = ({onChange, isDeposit})=>{
        const choice = ["Deposit","Cash Back"]; // an array choice  index 0 is Deposit index 1 is Cash Back
        return(
            <label className="label huge">
                <h3>{choice[Number(!isDeposit)]}</h3> {/*choice will display Deposit or Cash Back based on the !Deposit number value */}
                <input type="number" width="200" onChange={onChange}></input>
                <input type="submit" width="200" value="Submit"></input>
            </label>
            
        );
    };
    
    //define a web component Account that simulates the bank
    //it will keep track of the money we got
    //Account component is the parent component
    //and will have ATMDeposit as a child component
    const Account = ()=>{
        
        //define and initialize variables
        //to hold transactionState, totalState and status
        let deposit = 0; //state of this transaction
        const [totalState, setTotalState]= React.useState(0)//use React hook useState to initalize totalState to 0
        const [isDeposit, setIsDeposit]= React.useState(true); //use React hook useState to initalize isDeposit to true
       
        let status = `Account Balance $ ${totalState}`;
        console.log("Account Rendered");
        //function to handle the change in input
        const handleChange = event => {
            console.log(`handleChange ${event.target.value}`);
            deposit = Number(event.target.value);
        };
        //function to handle the sumition of the form
        const handleSubmit = () => {
            
            let newTotal = isDeposit ? totalState + deposit: totalState -deposit; // if isDeposit is true newTotal = totalState +deposit
                                                                                  //if isDeposit is not true newTotal = totalState = deposit
            setTotalState (newTotal);

            //prevent Cash Back withdrawals greater than Account Balance
            if(newTotal<0)
            {
                setTotalState(totalState);
                alert(`You can't withdrow more than account balance`);
            };
            event.preventDefault();//prevent reloading of the page 
           
        }; 
        return(
            <form onSubmit={handleSubmit}>
                <h2 id="total">{status}</h2>
                <button onClick= {()=>setIsDeposit(true)}>Deposit</button> {/*when the Deposit button is click call annoumus function to set isDeposit to true */}
                <button onClick= {()=>setIsDeposit(false)}>Cashback</button> {/*when the Cashback button is click call annoumus function to set isDeposit to false */}
                <ATMDeposit onChange={handleChange} isDeposit={isDeposit}></ATMDeposit>
            </form>
        );
        
    };
    //===============================================
    //render Account the parent component of the child component ATMDeposit
    ReactDOM.render(<Account/>,document.getElementById("root"));