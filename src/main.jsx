const audioClips = [
    "https://soundbible.com/mp3/Pew_Pew-DKnight556-1379997159.mp3", 
    "https://soundbible.com/mp3/Air_Wrench_Short-Lightning_McQue-2139303794.mp3",
    "https://soundbible.com/mp3/Short%20Egg%20Cracking-SoundBible.com-991604256.mp3",
    "https://soundbible.com/mp3/fire_bow_sound-mike-koenig.mp3",
    "https://soundbible.com/mp3/neck_snap-Vladimir-719669812.mp3",
    "https://soundbible.com/mp3/Drum%20Roll-SoundBible.com-1599301580.mp3",
    "https://soundbible.com/mp3/MP5_SMG-GunGuru-703432894.mp3",
    "https://soundbible.com/mp3/punch_or_whack_-Vladimir-403040765.mp3",
    "https://soundbible.com/mp3/Cowboy_with_spurs-G-rant-1371954508.mp3"
]

const buttonLetters = [
    "Q", "W", "E",
    "A", "S", "D",
    "Z", "X", "C"
]

const descriptions = [
    "pew!",
    "air wrench",
    "egg cracking",
    "arrow",
    "snap",
    "drumroll",
    "gun",
    "punch",
    "cowboy spurs"
]

function triggerSound(buttonElement) {
    document.getElementById("display").textContent = buttonElement.id
    buttonElement.children[0].play()
}

class DrumMachine extends React.Component {
    constructor(props) {
        super(props)
        
        let pads = []
        for (let n = 1; n <= props.numberOfPads; n++) {
            pads.push(n)
        }
        pads = pads.map(value => {
            const index = value - 1
            return <DrumPad 
                       audioSource={audioClips[index]} 
                       description={descriptions[index]}
                       num={value} 
                       key={value} 
                       letter={buttonLetters[index]}
                       />
        })
        this.state = { "pads": pads }

        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    handleKeyPress(event) {
        event.preventDefault()
        const letter = String.fromCharCode(event.keyCode).toUpperCase()
        const audioElement = document.getElementById(letter)
        triggerSound(audioElement.parentElement)
    }

    componentDidMount() {
        document.addEventListener('keypress', this.handleKeyPress)
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.handleKeyPress)
    }

    render() {
        return (
            <div id="drum-mahcine" className="drum-machine">
                <h1 className="drum-machine__title">Drum Machine</h1>
                <div id="display" className="drum-machine__display">
                    Press a button or key
                </div>
                {this.state.pads}
            </div>)
    }
}

function DrumPad(props) {
    function triggerChildSound(event) {
        event.preventDefault()
        triggerSound(event.target)
    }

    return (
        <div id={props.description} className="drum-pad" onClick={triggerChildSound}>
            {props.letter}
            <audio id={props.letter} className="clip" src={props.audioSource}></audio>
        </div>)
}

ReactDOM.render(<DrumMachine numberOfPads={9} />, document.getElementById('drum-machine'))
