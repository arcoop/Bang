// window.addEventListener("mousedown", (e) => {
//     let clickX = e.clientX - e.target.getBoundingClientRect().left;
//     let clickY = e.clientY - e.target.getBoundingClientRect().top;
//     let currentX;
//     let currentY;
//     console.log('click position' + [clickX, clickY])
//     this.game.currentPlayer.hand.forEach(card => {
//         console.log('card pos' + card.pos)
//         let innerXStart = card.pos[0]
//         let innerYStart = card.pos[1]
//         let innerXEnd = innerXStart + 145
//         let innerYEnd = innerYStart + 220
//         if ((clickX >= innerXStart && clickX <= innerXEnd) && (clickY >= innerYStart && clickY <= innerYEnd)) {
//             console.log("mousedown")
//             card.handleCardClick(e)
//             const dragCard = (e) => {
//                 currentX = e.clientX - e.target.getBoundingClientRect().left;
//                 currentY = e.clientY - e.target.getBoundingClientRect().top
//                 card.pos[0] = currentX;
//                 card.pos[1] = currentY;
//                 window.setInterval(this.drawObjects(this.gameCtx), 200)
//             }
//                 window.addEventListener("mousemove", dragCard)
//                 window.addEventListener("mouseup", (e) => {
//                     let xStart = this.playPositions[0][0] - 2
//                     console.log(xStart)
//                     let yStart = this.playPositions[0][1] - 10
//                     console.log(yStart)
//                     let xEnd = this.playPositions[4][0] + 150;
//                     let yEnd = yStart + 230;
//                     if ((currentX >= xStart && currentX <= xEnd) && (currentY >= yStart && currentY <= yEnd)) {
//                         console.log("mouseupo on play pile")
//                         window.removeEventListener("mousemove", dragCard)
//                         this.drawObjects(this.gameCtx)
//                         this.game.handlePlayClick(card, this.discardPositions, this.playPositions, this.playColors, this.discardColors);
//                         this.drawObjects(this.gameCtx)
//                     } else {
//                         console.log("mouseup on elsewhere")

//                     }
                    
//                 })

//         }

//     })
// })

// window.addEventListener("mousemove", (e) => {

//         //bind mouse cursor to canvas location
//     let clickX = e.clientX - e.target.getBoundingClientRect().left;
//     let clickY = e.clientY - e.target.getBoundingClientRect().top;
    
//         //when hovering over a specific clue type, select all cards that fit the attribute of the hovered clue 
//         //First, check if the card is selected 
//         //Then, check if the mouse location is in the same position as either the color clue or number clue icons
//         //If so, then call the handle clue hover method
//     this.game.players[1].hand.forEach(card => {
//         if (card.selected) {
//             let innerXStart = card.pos[0]
//             let innerYStart = card.pos[1] + 240
//             let innerXEnd = innerXStart + 60
//             let innerYEnd = innerYStart + 60
//             if ((clickX >= innerXStart && clickX <= innerXEnd) && (clickY >= innerYStart && clickY <= innerYEnd)) {
//                 this.game.handleClueHover(e, "color", card.color)
//                 this.drawObjects(this.gameCtx, "color", )
//             } else {
//                 innerXStart = card.pos[0] + 97
//                 innerYStart = card.pos[1] + 240
//                 innerXEnd = innerXStart + 60
//                 innerYEnd = innerYStart + 60
//                 if ((clickX >= innerXStart && clickX <= innerXEnd) && (clickY >= innerYStart && clickY <= innerYEnd)) {
//                     this.game.handleClueHover(e, "number", card.num)
//                     this.drawObjects(this.gameCtx, "number", true)
                    
//                 } else {
//                     this.drawObjects(this.gameCtx, "", false)
//                 }
//             }
//         }
//     })
        
//     //when mouse moves off the clue object, deselect related cards
//     this.game.players[1].hand.forEach(card => {
//         let xStart = card.pos[0];
//         let yStart = card.pos[1];
//         let xEnd = xStart + 140;
//         let yEnd = yStart + 220;
//         if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
//             this.game.players[1].hand.forEach(innerCard => {
//                 if (innerCard.secondarySelected) {
//                     innerCard.secondarySelected = false
//                 }
//             })
//         }
        
//         })
//     })

//     window.addEventListener("click", (e) => {
//         let clickX = e.clientX - e.target.getBoundingClientRect().left;
//         let clickY = e.clientY - e.target.getBoundingClientRect().top;
        
//         //change a clicked card to selected state
//         this.currentHands().forEach(card => {
//             let xStart = card.pos[0];
//             let yStart = card.pos[1];
//             let xEnd = xStart + 140;
//             let yEnd = yStart + 220;
//             if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
//                 card.handleCardClick(e)
//                 this.drawObjects(this.gameCtx)
//             }
//         })
        
        
//         // move a selected card to discard pile
//         // let xStart = this.discardPositions[0][0] - 2
//         // let yStart = this.discardPositions[0][1]- 2
//         // let xEnd = this.discardPositions[4][0] + 150
//         // let yEnd = yStart + 230;
//         // if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
//         //     this.game.handleDiscardClick(e, this.discardPositions, this.discardColors);
//         //     this.drawObjects(this.gameCtx)
            
//         // }
        
//         // //move a selected card to play pile
//         // xStart = this.playPositions[0][0] - 2
//         // yStart = this.playPositions[0][1] -2
//         // xEnd = this.playPositions[4][0] + 150;
//         // yEnd = yStart + 230;
//         // if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
//         //     this.game.handlePlayClick(e, this.discardPositions, this.playPositions, this.playColors, this.discardColors);
//         //     this.drawObjects(this.gameCtx)
//         // }
        

//         for (let i = 0; i < this.game.players[1].hand.length; i ++) {
//             let card = this.game.players[1].hand[i]
//             if (card.selected) {
//                 let xStart = this.clueColorPositions[i][0]
//                 let yStart = this.clueColorPositions[i][1]
//                 let xEnd = xStart + 60
//                 let yEnd = yStart + 60
//                 if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
                    
//                     const cluedCards = []
//                     this.game.players[1].hand.forEach(card => {
//                         if (card.selected || card.secondarySelected) {
//                             cluedCards.push(card)
//                         }
//                     })
                    
//                     this.game.giveClue(cluedCards, "color", this.gameCtx)
//                     this.currentHands().forEach(card => {
//                         card.selected = false;
//                         card.secondarySelected = false;
//                     })
//                     this.game.switchTurns();
//                     this.drawObjects(this.gameCtx)
                    
//                 } else {
//                     xStart = this.clueNumberPositions[i][0]
//                     yStart = this.clueNumberPositions[i][1]
//                     xEnd = xStart + 60
//                     yEnd = yStart + 60
//                     if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
//                         const cluedCards = []
//                         this.game.players[1].hand.forEach(card => {
//                             if (card.selected || card.secondarySelected) {
//                                 cluedCards.push(card)
//                             }
//                         })
//                         this.game.giveClue(cluedCards, "number")
//                         this.currentHands().forEach(card => {
//                             card.selected = false;
//                             card.secondarySelected = false;
//                         })
//                         this.game.switchTurns();
//                         this.drawObjects(this.gameCtx)
//                     }
                    
//                     this.drawObjects(this.gameCtx)
//                 }
//             }
//         }
//         //event listener checks if click is located on the "view teammates perspective" button
//         //calls a method that re-renders the card from the teammates perspective
//         let xStart = 4
//         let yStart = 710
//         let xEnd = xStart + 258
//         let yEnd = yStart + 25
//         if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
//             this.viewTeammatesPerspective();
//         }
        
        
//     })
//     this.drawObjects(this.gameCtx)
//     // }
    
//     //add functionality for things to render bigger on mouseover
    
// // } 
// }
// renderClueNum(gameCtx) {
// const cards = this.game.players[1].hand
// let numImage;
// for (let i = 0; i < cards.length; i ++) {
//     let card = cards[i]
//     if (card.selected) {
//         numImage = document.getElementById(`${card.num}`)
//         this.gameCtx.drawImage(numImage, card.pos[0] + 90, card.pos[1] + 258, 20, 30)
//         // this.gameCtx.beginPath();
//         // this.gameCtx.roundRect(this.clueNumberPositions[i][0],this.clueNumberPositions[i][1], 60, 60, 3);
//         // this.gameCtx.strokeStyle = "black"
//         // this.gameCtx.stroke();
//         // this.gameCtx.font = "20px Futura"
//         // this.gameCtx.fillStyle = "black"
//         // this.gameCtx.fillText(`${card.num}`, card.pos[0] + 102, card.pos[1] + 274)
        
//     }
// }
// }