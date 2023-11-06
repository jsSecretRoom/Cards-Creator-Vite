

function DeleteButton({id, handleDelete}) {
    
    return ( 
        <>
            <button onClick={() => handleDelete(id)}>Delete</button>
        </>
        
    );
}

export default DeleteButton;