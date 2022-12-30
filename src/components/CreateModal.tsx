interface CreateModalProp {
    create: boolean,
    setCreate: Function
}

const CreateModal:React.FC<CreateModalProp> = ({ create, setCreate }) => {

    if (!create) return (null);

    return (
        <>
        <div>
            <div>
                <div className="add" onClick={() => {setCreate(false)}}>x</div>
                <form>
                    <input type="text" placeholder="to" />
                    <input type="text" placeholder="message" />
                    <input value="send" type="submit"/>
                </form>
            </div>
        </div>
        </>
    );
}

export default CreateModal;