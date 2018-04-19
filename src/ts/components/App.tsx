import React = require("react");
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component<any, any> {
    private name: string;

    public constructor (props: any) {
        super(props);
        this.state = {
            name: ''
        }
    }

    public render () {
        return (
            <div>
                <h1>Pronto para iniciar o projeto</h1>
            </div>
        );
    }
}

export default App