function DeleteButton({id}) {
    return ( 
        <>
            <button onClick={() => handleDelete(id)}>Delete</button>
        </>
        
    );
}

export default DeleteButton;