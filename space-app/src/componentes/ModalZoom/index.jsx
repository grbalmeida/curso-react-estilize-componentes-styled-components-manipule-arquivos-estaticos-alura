const ModalZoom = ({ foto }) => {
    return (
        <>
            <dialog open={!!foto}>
                <form method="dialog">
                    <button>OK</button>
                </form>
            </dialog>
        </>
    )
}

export default ModalZoom;