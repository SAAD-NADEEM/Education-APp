import LoadingBar from "./LoadingBar";

interface Props {
    isLoading: boolean
    inputRef: React.RefObject<HTMLInputElement>,
}

function Input(props: Props) {

    const { isLoading, inputRef } = props



    return (
        <>
            {isLoading ? <LoadingBar /> : (<>
                <input type="text" ref={inputRef} placeholder="Waiting for Your Input..." />
                <button type='submit'></button>
            </>)}
        </>
    );
}

export default Input;