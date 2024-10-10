import { AnimalList } from '../cmps/Animal-List.jsx'
import { SeasonClock } from '../cmps/Season-clock.jsx'
import { CountDown } from '../cmps/Count-down.jsx'
import { WatcherApp } from '../cmps/watcher-app.jsx'
export function Home() {
    return (
        <section>
            {/* <h2>Home Sweet Home</h2> */}
            {/* <AnimalList animalInfo={animalInfos} /> */}
            {/* <SeasonClock /> */}
            {/*   <CountDown
                startFrom={10}
                onDone={() => {
                    console.log('Done!')
                }}
                toTime={Date.now() + 1000 * 5}
            /> */}
        </section>
    )
}
