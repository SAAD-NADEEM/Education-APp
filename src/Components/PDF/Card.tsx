

function Card(props: any) {

    const delTrigger = new Event('refresh') 

    const { handleModel, card, DBRef } = props


    const del = (currentId:string) => {
        const db = DBRef.current
        if(db) {
            const transaction = db.transaction('responses', 'readwrite')
            const storeObject = transaction.objectStore('responses')

            const deleteReq = storeObject.delete(currentId)

            deleteReq.onsuccess = () => {
                window.dispatchEvent(delTrigger)
                console.log("Successfully Deleted the selected response");
            }
            deleteReq.onerror = () => {
                console.log('Error deleting the saved response!');
            }
        }
    }
    
    const handleDel = (e:any, id:string) => {
        e.stopPropagation()
        del(id)
    }

    return (
        <div onClick={() => handleModel(card.response)} className="card">
            <div className="card-ctn flex-column center">
                <p>{card.response}</p>
                <button onClick={(e) => handleDel(e, card.id)} className="testbutton"></button>
            </div>
        </div>
    );
}

export default Card;