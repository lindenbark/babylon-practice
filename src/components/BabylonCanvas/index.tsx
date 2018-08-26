import * as React from 'react';
import {
    Engine,
    Scene,
} from 'babylonjs';

interface BabylonCanvasProps {
    className?: string;
    init: (engine: Engine, scene: Scene, canvas: HTMLCanvasElement) => void;
    engineOptions?: BABYLON.EngineOptions;
    adaptToDeviceRatio?: boolean;
    width?: number;
    height?: number;
}
interface BabylonCanvasState {
    width: number;
    height: number;
}
export default class BabylonCanvas extends React.Component<BabylonCanvasProps, BabylonCanvasState> {
    private scene: Scene | null = null;
    private engine: Engine | null = null;
    private canvas: React.RefObject<HTMLCanvasElement> = React.createRef();
    state: BabylonCanvasState = { width: 0, height: 0 };
    private setCanvasSize() {
        this.setState({
            width: this.props.width || window.innerWidth,
            height: this.props.height || window.innerHeight,
        });
    }
    private onResize = () => this.setCanvasSize();
    componentDidUpdate(prevProps: BabylonCanvasProps) {
        if ((prevProps.width !== this.props.width) || (prevProps.height !== this.props.height)) this.setCanvasSize();
        this.engine && this.engine.resize();
    }
    componentDidMount() {
        const {
            init,
            engineOptions,
            adaptToDeviceRatio,
        } = this.props;
        const canvas = this.canvas.current!;
        this.engine = new Engine(canvas, true, engineOptions, adaptToDeviceRatio);
        this.scene = new Scene(this.engine);
        init && init(this.engine, this.scene, canvas);
        this.setCanvasSize();
        window.addEventListener('resize', this.onResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }
    render() {
        const {
            className,
        } = this.props;
        const {
            width,
            height,
        } = this.state;
        return <canvas
            className={className}
            width={width}
            height={height}
            ref={this.canvas}
        />;
    }
}
