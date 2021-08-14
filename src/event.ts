import mitt from "mitt";

type EmitterEvents = {
    scroll: Event;
}

const emitter = mitt<EmitterEvents>();

export default emitter;