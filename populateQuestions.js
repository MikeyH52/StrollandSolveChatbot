/**
 * Loads the questions for the bot
 * @title Load Questions
 * @category Custom
 * @author Your_Name
 */
const myAction = async () => {
  // set some initial values

  bp.logger.info('User questionIndex:', user.questionIndex)

  if (!user.questionIndex) user.questionIndex = 1

  session.questionIndex = 0
  session.incorrectGuesses = 0
  session.questionsSkipped = 0
  session.questions = {}

  // all questions and facts
  const questionsToLoad = [
    {
      type: 'question',
      question: `Now, quickly leave my friends, head towards the Cathedral entrance by crossing the road (*take care using the pelican crossing), turn right after crossing and enter College Yard, before you arrive at the cathedral entrance you must search for a ‘badge of honour’ by some nearby steps. 
        We need the date shown for our first answer. Take a note of this date, it will be needed later…`,
      hint: 'Near no. 7',
      answer: ['1995'],
      attempts: 3
    },
    {
      type: 'question',
      question: `**Captain Titus May:** For our King! That’s an excellent start! First clue solved, onwards my friends. Carry on walking towards the entrance to the cathedral, but then turn left and follow the path back towards the main road. Turn right and begin to look for College Precincts and for a famous Worcestershire resident who lived along here, and someone you have already looked up to?! What’s his name?`,
      hint: '2 plaques',
      answer: ['edward elgar', 'elgar', 'elger', 'ed elgar', 'ed Elger', 'eddie elgar', 'eddie elger'],
      attempts: 3
    },
    {
      type: 'fact',
      fact: `Did you know… Elgar was one of the first composers to fully embrace recorded music. He regularly teamed up with the bods at HMV to make premiere recordings of his works, including the ‘Enigma’ Variations and the Cello Concerto`
    },
    {
      type: 'question',
      question: `**Captain Titus May:** That’s correct! You are indeed a loyal and worthy subject. Proceed through College Precincts, then down some small steps* and turn right under Edgar Tower and into College Gardens. 

      (*for those needing an alternative route to avoid the steps, please check out the map shown to help you get to clue 3. If struggling to decipher the map, remember to just follow straight down College Street and turn right into Edgar Street, the Edgar Tower will be in front of you and Clue 3 awaits!*)
      
      Be careful, Cromwell’s men have been spotted here! Turn left as you enter into the garde, you are looking for initials of a former teacher at Choir House. What are those initials?`,
      leadingImage: 'AlternativeRoute1.png',
      hint: 'Statue',
      answer: ['hhw'],
      attempts: 3
    },
    {
      type: 'question',
      question: `**Captain Titus May:** Skilfully done! Now stay on the path and head towards a trimmed but gnarled tree standing on its own patch of land. On a nearby building there is an acknowledgement of a person who composed several musical pieces for the coronation of our King’s father, Charles I. What was his name?`,
      hint: 'On the wall double initials',
      answer: ['thomas tomkins', 'thomas thomkins', 'tom tomkins', 'tomkins', 'tom tompkins', 't. tomkins'],
      attempts: 3
    },
    {
      type: 'question',
      question: `**Captain Titus May:** Well done my fellow soldiers! Now follow the path to the left and downhill towards a small cottage with a green door and down some steps* into what’s known as Worcester’s Water Gate.
 
      (*There are several uneven steps here, so for those who need an alternative route please follow the map shown.
      Just retrace your steps back to the entrance to the Edgar Tower, turn right and follow-on Severn Street until it narrows, and you see The Diglis Hotel and the river in front of you. At this point you join up with the route again and are ready for Clue 6.*)
      
      The mighty River Severn is now in view, and what we need to look for on a wall nearby is for a date that highlights the highest ever flood level the river reached at this spot. What is this date? Remember this, as it will be needed later to help solve the passcode.`,
      hint: 'Top brick',
      answer: ['1770'],
      attempts: 3
    },
    {
      type: 'fact',
      fact: 'The Water Gate dates from 1378 and gave access to the cathedral’s monastic precinct.'
    },
    {
      type: 'question',
      question: `Keep going trusted subjects, facing the river turn left and head towards the hotel (Diglis), passing this keep your eyes peeled for a hint of an Italian influence, on a location where you could watch the Severn flow on by…`,
      hint: 'House',
      answer: ['florence villas', 'florence', 'florance villas', 'florance'],
      attempts: 3
    },
    {
      type: 'question',
      question: `**Captain Titus May:** For our King! Walk on intrepid Cavaliers, towards the ‘bouncing bridge’, here we need to find another number to help with the passcode. The bridge highlights the start of the Worcestershire to Birmingham canal, you are 30 miles from the centre of Birmingham, but how many ‘gates’ are there on this journey north? Remember this number for later…`,
      hint: 'Check the sign',
      answer: ['58'],
      attempts: 3
    },
    {
      type: 'question',
      question: `**Captain Titus May:** Now walk over the ‘bouncing’ bridge and turn left and up towards the marina, be careful about any parliamentarians hiding amongst the barges and boats! Crossing a small bridge (passing a floating café - an excellent place to stop and refuel! *Use map shown to help with directions) and then over a small swing bridge, head towards the shop and office, but just before reaching these, take a left onto the canal path that leads you behind the Anchor pub.
      
      The next clue needs you to follow the breadcrumbs… well almost… what type of crumb was brought here on its onward journey up the canal?`,
      leadingImage: 'MarinaToCanalPath.png',
      hint: 'Cadbury’s',
      answer: ['chocolate', 'choco', 'choc', 'cocoa', 'choc'],
      attempts: 3
    },
    {
      type: 'question',
      question: `**Captain Titus May:** Excellent! You are indeed suited for this difficult task! Now, continue along the canal path (*Please keep an eye on young children as you walk along the canal path) and look for bridge number 3. Atop this bridge you should see items that are very familiar during our battles throughout this Civil War, including what sort of headwear?`,
      hint: 'A biker would wear one…',
      answer: ['helmet', 'hat', 'headpiece', 'headgear', 'head gear', 'armour'],
      attempts: 3
    },
    {
      type: 'fact',
      fact: `If you get the chance, Fort Royal Hill, a park, and the site of a Royalist fort during the last Civil War is nearby and is well worth a visit. During the last battle of the war this Royalist position became untenable when the Essex militia stormed and captured Fort Royal, turning the Royalist guns to fire on Worcester. 
      Interestingly the second and third President’s of the United States visited Fort Royal Hill. Follow the links to see what John Adams said about the place and directions to it - [Fort Royal Hill](https://en.wikipedia.org/wiki/Fort_Royal_Hill) and [Fort Royal Park](https://www.worcester.gov.uk/leisure-parks-allotments/parks-green-spaces/park-sites/fort-royal-park)`,
      leadingImage: 'CommanderyAndFortRoyalHill.jpg'
    },
    {
      type: 'question',
      question: `**Captain Titus May:** For our King! Be careful! Keep a look out for Cromwell’s men, as you step up into Sidbury Lock and turn right into the side of the Commandery building ([The Commandery](https://www.museumsworcestershire.org.uk/museums/the-commandery/)), an old HQ of ours. Coming out of the Commandery turn left and use the level crossing to cross over to the other side of the road and then turn right and then left into King Street (*use map to help).
      
      Head towards the ‘Slip House’ sign and then right into the Royal Porcelain Works area. To answer our next clue, we are looking for a Coat of Arms and in particular the name of the building they sit upon. `,
      hint: 'Steps lead the way…',
      answer: ['henry sandon hall', 'henry sandon', 'sandon hall', 'h. sandon hall', 'henry sandan hall'],
      attempts: 3
    },
    {
      type: 'question',
      question: `**Captain Titus May:** Sidbury! Oh Sidbury! We are losing the battle! But you, our trusted confidantes are winning the war, we are sure of it, keep going! Walk through the square and turn right onto Severn Street, for your next clue you are looking for reference to an old medieval gate that once stood on this site, and what in fact this gate was called…`,
      hint: 'Dyson Perrins Museum',
      answer: ['frog gate', 'frog'],
      attempts: 3
    },
    {
      type: 'fact',
      fact: `This, the smallest of Worcester’s gateways, spanned the road at this point between the city wall and the castle bailey (a courtyard enclosed by a curtain wall). It was close to here that Worcester's castle fortress once stood, the first castle being built shortly after the Norman Conquest.`
    },
    {
      type: 'question',
      question: `**Captain Titus May:** Another clue solved! Well done! Continue along Severn Street and head back towards the Edgar Tower, you are now looking for the number of salmon fishing families that lived in this street in 1861, which was formerly known as Frog Lane. Remember this number, as it will be needed with the others at the end to solve the passcode.`,
      hint: 'By the antiques… and not the highest',
      answer: ['18'],
      attempts: 3
    },
    {
      type: 'question',
      question: `**Captain Titus May:** Keep going loyal Cavaliers! Turn right into Edgar Street and then use the traffic crossing and make your way over to the other side of the road and head towards the Ye Olde Talbot pub, and then right into Friar Street. From here you are looking for a cardinal and his hat… and what it’s famous for in this city…?`,
      hint: 'Opp. NCP',
      answer: ['oldest pub in worcester', 'oldest pub', 'worcesters oldest pub', 'oldest public house in worcester'],
      attempts: 3
    },
    {
      type: 'fact',
      fact: `The nearby [Tudor House Museum](https://www.tudorhouse.org.uk/about-us/) is a fantastic, independent museum full of intriguing facts and interesting stories. If you get time on your visit to the Faithful City be sure to check it out…`
    },
    {
      type: 'question',
      question: `**Captain Titus May:** Excellent! You are doing so well! Carry on walking along Friar Street into the pedestrian zone, where you need to start looking for a peaceful and quiet place that was anything but, somewhere that would be ideal to put those parliamentarian traitors! What was this place?`,
      hint: 'Gates',
      answer: ['city jail', 'a jail', 'jail', 'gaol', 'city gaol', 'worcester jail', 'worcester gaol'],
      attempts: 3
    },
    {
      type: 'question',
      question: `**Captain Titus May:** Well done loyal subjects, we now move from Friar Street and into New Street, where we are looking out for a place of worship, the first of its kind in this fair city. Please our Lord and find the answer to this clue… what is the denomination (Christian religion) this building hosted?`,
      hint: 'Try a Mexican nearby…',
      answer: [
        'methodist',
        'methdist',
        'c of e',
        'church of england',
        'protestant christian',
        'protestant',
        'christian',
        'christianity'
      ],
      attempts: 3
    },
    {
      type: 'question',
      question: `**Captain Titus May:** You haven’t missed a thing! Now, friends, please be wary, I have no doubt Cromwell’s treacherous soldiers will be close by as you solve the next clue… Look for a building, that holds a special place in our King’s affections, a place that enabled him to hide from the clutches of the Roundheads. This place has a date attributed to our King’s daring initial escape, what is it? Remember to keep this answer safe, it will be needed later…`,
      hint: 'Swan',
      answer: ['1651'],
      attempts: 3
    },
    {
      type: 'fact',
      fact: `The bill for King Charles II’s Royalist army uniforms, commissioned from the Clothiers Company of Worcester, wasn’t settled until recently when the Prince of Wales, now King Charles III, paid off the debt over 350 years later!`
    },

    // need to come back to this answer set, might be a bit difficult...
    {
      type: 'question',
      question: `**Captain Titus May:** Praise our Lord, save our King! You are achieving great things! From our King’s hide out, we enter the Cornmarket, here we are looking for the names of 5 people who have links to this Faithful City, they stand proud in the corners of the Cornmarket, can you spot and name them all?`,
      hint: '5 statues',
      answer: ['king charles ii, woodbine willy, vesta tilley, william shakespeare/anne hathaway'],
      attempts: 3
    },

    {
      type: 'fact',
      fact: `Matilda Alice Powles was an English music hall performer, she adopted the stage name Vesta Tilley and became one of the best-known male impersonators of her time, and during a successful career became one of the highest earning women in England.`
    },
    {
      type: 'question',
      question: `**Captain Titus May:** We are nearly at the end, keep up the good work soldiers. Make your way into and through Melcheapen Street (past The Royal Exchange pub) straight into St. Swithins Street, where a feathery friend of Christmas Day’s past and present is referenced somewhere on this street, which in days gone by was also known by this name…`,
      hint: 'Natwest',
      answer: ['goose lane', 'goose', 'goose street', 'geese'],
      attempts: 3
    },
    {
      type: 'question',
      question: `**Captain Titus May:** Praise be! You have stuck to your task so well! Now, walk towards and onto Broad Street, where we need to solve a particularly saucy clue, one that describes the original setting and manufacture of one of Worcester’s most famous exports… What is it? `,
      hint: 'Time for a pasty...',
      answer: ['worcestershire sauce', 'worcester sauce', 'sauce', 'worcestershire source', 'worcester source'],
      attempts: 3
    },
    {
      type: 'fact',
      fact: `The list of ingredients, but no method, of the original Worcestershire sauce by Lea & Perrins was first uncovered in 2009 in a rubbish bin, and the document now resides in the [Worcester City Art Gallery & Museum](https://www.museumsworcestershire.org.uk/museums/worcester-city-art-gallery-museum/) – well worth a visit!`
    },

    // another to come back to due to the different options
    {
      type: 'question',
      question: `**Captain Titus May:** Good work! We are getting close to our goal. As you continue to walk along Broad Street remember to keep a watchful eye out for any parliamentarian spies, they could be anywhere! Especially as you are looking up for something a little strange and surreal, 3 of them in fact! What are they and what pub are they looking at?`,
      hint: 'Looking straight ahead for a drink!',
      answer: ['3 figureheads & the crown pub'],
      attempts: 3
    },

    {
      type: 'question',
      question: `**Captain Titus May:** You are so loyal, keep going! Turn left into the Crowngate indoor shopping area, as you walk through you are on the lookout for a tree that is closely associated with the county and is shown on many county institutions and clubs’ emblems and crests. What kind of tree is it?`,
      hint: 'Look up as you enter',
      answer: ['black pear tree', 'black pear', 'pear tree', 'pear', 'black pare tree', 'black pare'],
      attempts: 3
    },
    {
      type: 'question',
      question: `**Captain Titus May:** Exactly right, nothing can stop you now! Continue to walk through the indoor area, bearing right and passing through a small outdoor area (*lots of restaurants and cafes to check out now or to come back to you when you’ve finished!), then head upwards towards the main high street, for the next clue it’s time to look back and hope one of these isn’t charging up behind you!`,
      hint: 'Above an arch',
      answer: ['bull', 'black bull', 'bullock', 'cattle', 'bulls'],
      attempts: 3
    },
    {
      type: 'fact',
      fact: `The Crowngate Shopping Centre was built in part on the historic site of Worcester’s Blackfriars Monastery. In 1985-86 archaeological excavations were carried out prior to the construction of the new centre, these uncovered: a Roman road and timber buildings, a Saxon building and bread ovens, the cloisters and friary church of the monastery, which were aligned with the Roman Road and civil war defences facing towards St Johns.`
    },
    {
      type: 'question',
      question: `**Captain Titus May:** Praise our King, you are so near to solving this puzzle and saving him. As you enter the High Street, turn right and head toward the magnificent Guildhall, here your journey comes to an end. You have managed to avoid Cromwell’s dreaded Roundhead soldier and spies, but you must solve the last clue before one final task awaits you…
      The frontage of the Guildhall pays tribute to our King and his father, Charles I, in two magnificent statues, but what are they holding in their left hands?`,
      hint: 'To the sides of the entrance…',
      answer: [
        'church and orb',
        'cathedral',
        'a church',
        'abbey',
        'chapel',
        'monastery',
        'place of worship',
        'ball',
        'sphere',
        'globe',
        'circle',
        'round orb'
      ],
      attempts: 3
    },
    {
      type: 'fact',
      fact: `Charles II entered the city of Worcester on 22nd August 1651, following the city council’s decision not to oppose his entry, thus the city earned the title of the ‘faithful City’. Marking this fact when the Guildhall was built the ‘head’ of Oliver Cromwell, fashioned to resemble the devil, was pinned by the ears above the door of the Guildhall, and can be seen still to this day.`,
      leadingImage: 'Cromwell.jpg'
    },
    {
      type: 'question',
      question: `**Captain Titus May:** Praise our Lord, and our King! You’ve reached the end, now my friends with all the clues hopefully solved, you must now work out the secret 4-digit code that allows our glorious King to escape and gain safe passage to France. 
      From the 5 clues that had numbered answers (which you hopefully kept safe! Scroll back through the clues if need be!), add these answers together to get the 4-digit code that we need! Be careful now… get it wrong and you could alert Cromwell’s spies and the escape attempt could be foiled! Total up and send in your answer…`,
      hint: 'The sum of all the number answers...',
      answer: ['5492'],
      attempts: 3
    }
  ]

  // add all questions/facts into object with question index as the key
  questionsToLoad.map((q, idx) => (session.questions[idx + 1] = q))

  // total question count
  session.questionCount = Object.keys(session.questions).flatMap(q =>
    session.questions[q].type === 'question' ? [1] : []
  ).length

  session.factCount = Object.keys(session.questions).flatMap(q =>
    session.questions[q].type === 'fact' ? [1] : []
  ).length

  session.totalItemCount = Object.keys(session.questions).length
  bp.logger.info(`Total questions: ${session.questionCount}`)
  bp.logger.info(`Total facts: ${session.factCount}`)
  bp.logger.info(`Total items: ${session.totalItemCount}`)

  // bp.logger.info(name)
  // bp.logger.info(value)

  // return 'Hello!'
}

return myAction()