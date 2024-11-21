
import LoadingGIF from '@/assets/Loading.gif';

const Loading = () => {
    return (
        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
            <img src={LoadingGIF} alt="Loading..." width={40} height={40} />
        </div>
    );
};

export default Loading;
