import { Component } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export class Loading extends Component {
    render() {
        return (
            <div className="h-screen w-screen absolute top-0 left-0 flex justify-center items-center bg-gray-400 opacity-30">
                <Loader
                    type="TailSpin"
                    color="black"
                    height={50}
                    width={50}
                />
            </div>
        );
    }
}