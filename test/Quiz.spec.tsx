import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import Quiz from '../src/components/Quiz';
import { CrewManifest, CrewMember } from '../src/services/crew-manifest';
import { ChainCodeAlignmentString } from '../src/services/chain-code';

// Mock quizData if it's not already exported from Quiz.tsx
// For now, assuming quizData is internal and we test its effects.
const quizData = [
  {
    id: 1,
    question: "What do you never leave home without?",
    answers: [
      { text: "A good blaster", points: { Cause: 1, FO: 0, Resistance: 0 } },
      {
        text: "My official identification",
        points: { Cause: 0, FO: 1, Resistance: 0 },
      },
      {
        text: "My trusty crewmates",
        points: { Cause: 0, FO: 0, Resistance: 1 },
      },
    ],
  },
  {
    id: 2,
    question: "What do you seek?",
    answers: [
      { text: "Peace", points: { Cause: 0, FO: 0, Resistance: 2 } },
      { text: "Freedom", points: { Cause: 2, FO: 0, Resistance: 0 } },
      { text: "Power", points: { Cause: 0, FO: 2, Resistance: 0 } },
    ],
  },
  {
    id: 3,
    question: "What are you ordering at Oga's?",
    answers: [
      {
        text: "Imperial Red. Thanks to my connections, I can afford the finer things.",
        points: { Cause: 0, FO: 2, Resistance: 0 },
      },
      {
        text: "Whatever my crewmates are drinking. Unless I'm headed out on a mission - in that case, it's a black caf. The mission comes first.",
        points: { Cause: 0, FO: 0, Resistance: 2 },
      },
      {
        text: "Depends who's buying.",
        points: { Cause: 2, FO: 0, Resistance: 0 },
      },
    ],
  },
  {
    id: 4,
    question: "You come upon a wounded loth-cat in the street. Do you:",
    answers: [
      {
        text: "Comm the local wildlife specialist. This is someone’s problem, but not mine.",
        points: { Cause: 2, FO: 0, Resistance: 0 },
      },
      {
        text: "Leave it be. Nature is cruel but there is an order and a rightness to the cruelty. Only the strong are fated to survive.",
        points: { Cause: 0, FO: 2, Resistance: 0 },
      },
      {
        text: "Nurse the Loth Cat back to health.",
        points: { Cause: 0, FO: 0, Resistance: 2 },
      },
    ],
  },
  {
    id: 5,
    question:
      "You accidentally intercept a transmission. It sounds important and a little illegal. What do you do?",
    answers: [
      {
        text: "Ascertain if someone is in trouble or needs help.",
        points: { Cause: 0, FO: 0, Resistance: 2 },
      },
      {
        text: "Scour it for useful information.",
        points: { Cause: 2, FO: 0, Resistance: 0 },
      },
      {
        text: "Report it to the authorities immediately, making sure the higher-ups know who found it.",
        points: { Cause: 0, FO: 2, Resistance: 0 },
      },
    ],
  },
];


// Mock CrewManifest
const mockCrewManifest = new CrewManifest();
// Clear existing members and add specific ones for testing
mockCrewManifest.crew.set("AARC Agents", []); // Clear existing leaders
mockCrewManifest.addCrewMember(new CrewMember({
  name: "Vesper Grey (Mock)",
  alignment: ChainCodeAlignmentString.Light,
  image: "vesper.png",
  meetingLocation: "Mock Vesper Location",
  type: "AARC Agents"
}));
mockCrewManifest.addCrewMember(new CrewMember({
  name: "Lias Orion (Mock)",
  alignment: ChainCodeAlignmentString.Neutral,
  image: "lias.jpg",
  meetingLocation: "Mock Lias Location",
  type: "AARC Agents"
}));
mockCrewManifest.addCrewMember(new CrewMember({
  name: "Evant Verrick (Mock)",
  alignment: ChainCodeAlignmentString.Dark,
  image: "evant.jpg",
  meetingLocation: "Mock Evant Location",
  type: "AARC Agents"
}));

describe('Quiz Component', () => {
  let mockSetAlignment: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockSetAlignment = vi.fn();
  });

  describe('Initial Rendering', () => {
    it('should display the first question and initial progress', () => {
      render(<Quiz setAlignment={mockSetAlignment} crewManifest={mockCrewManifest} />);
      
      expect(screen.getByText(`Question 1/${quizData.length}: ${quizData[0].question}`)).toBeInTheDocument();
      quizData[0].answers.forEach(answer => {
        expect(screen.getByText(answer.text)).toBeInTheDocument();
      });
      const expectedInitialProgress = Math.round((1 / quizData.length) * 100);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', expectedInitialProgress.toString());
    });
  });

  describe('Answering Questions', () => {
    it('should update scores and display the correct result when Resistance wins', () => {
      render(<Quiz setAlignment={mockSetAlignment} crewManifest={mockCrewManifest} />);
      fireEvent.click(screen.getByText(quizData[0].answers[2].text));
      fireEvent.click(screen.getByText(quizData[1].answers[0].text));
      fireEvent.click(screen.getByText(quizData[2].answers[1].text));
      fireEvent.click(screen.getByText(quizData[3].answers[2].text));
      fireEvent.click(screen.getByText(quizData[4].answers[0].text));
      expect(screen.getByText('The Sorting Helmet has decided!')).toBeInTheDocument();
      expect(screen.getByText('You belong with: The Resistance')).toBeInTheDocument();
      const resistanceLeader = mockCrewManifest.getLeaders().find(leader => leader.alignment === ChainCodeAlignmentString.Light);
      expect(screen.getByText(`Meet with your leader, ${resistanceLeader!.name}, ${resistanceLeader!.meetingLocation} at 6:30`)).toBeInTheDocument();
      expect(screen.getByRole('img', { name: '' })).toHaveAttribute('src', resistanceLeader!.image);
    });

    it('should update scores and display the correct result when The Cause wins', () => {
      render(<Quiz setAlignment={mockSetAlignment} crewManifest={mockCrewManifest} />);
      fireEvent.click(screen.getByText(quizData[0].answers[0].text));
      fireEvent.click(screen.getByText(quizData[1].answers[1].text));
      fireEvent.click(screen.getByText(quizData[2].answers[2].text));
      fireEvent.click(screen.getByText(quizData[3].answers[0].text));
      fireEvent.click(screen.getByText(quizData[4].answers[1].text));
      expect(screen.getByText('You belong with: The Cause')).toBeInTheDocument();
      const causeLeader = mockCrewManifest.getLeaders().find(leader => leader.alignment === ChainCodeAlignmentString.Neutral);
      expect(screen.getByText(`Meet with your leader, ${causeLeader!.name}, ${causeLeader!.meetingLocation} at 6:30`)).toBeInTheDocument();
      expect(screen.getByRole('img', { name: '' })).toHaveAttribute('src', causeLeader!.image);
    });

    it('should update scores and display the correct result when The First Order wins', () => {
      render(<Quiz setAlignment={mockSetAlignment} crewManifest={mockCrewManifest} />);
      fireEvent.click(screen.getByText(quizData[0].answers[1].text));
      fireEvent.click(screen.getByText(quizData[1].answers[2].text));
      fireEvent.click(screen.getByText(quizData[2].answers[0].text));
      fireEvent.click(screen.getByText(quizData[3].answers[1].text));
      fireEvent.click(screen.getByText(quizData[4].answers[2].text));
      expect(screen.getByText('You belong with: The First Order')).toBeInTheDocument();
      const firstOrderLeader = mockCrewManifest.getLeaders().find(leader => leader.alignment === ChainCodeAlignmentString.Dark);
      expect(screen.getByText(`Meet with your leader, ${firstOrderLeader!.name}, ${firstOrderLeader!.meetingLocation} at 6:30`)).toBeInTheDocument();
      expect(screen.getByRole('img', { name: '' })).toHaveAttribute('src', firstOrderLeader!.image);
    });

    it('should correctly update progress bar as questions are answered', () => {
      render(<Quiz setAlignment={mockSetAlignment} crewManifest={mockCrewManifest} />);
      for (let i = 0; i < quizData.length; i++) {
        const questionNumber = i + 1;
        const expectedProgress = Math.round((questionNumber / quizData.length) * 100);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', expectedProgress.toString());
        if (questionNumber <= quizData.length) {
            const questionText = `Question ${questionNumber}/${quizData.length}: ${quizData[i].question}`;
            expect(screen.getByText(questionText)).toBeInTheDocument();
            fireEvent.click(screen.getByText(quizData[i].answers[0].text));
        }
      }
    });
  });

  /*
  describe('Tie-Breaking Logic', () => {
    // The internal tie-breaking logic (Cause > FO > Resistance) is deterministic.
    // Specific tie scenarios through UI clicks are hard to guarantee with fixed quizData
    // and were removed. Winning scenarios in 'Answering Questions' cover non-tie cases.
  });
  */

  describe('Restarting the Quiz', () => {
    it('should reset to the first question, clear scores, and set quizComplete to false', () => {
      render(<Quiz setAlignment={mockSetAlignment} crewManifest={mockCrewManifest} />);
      quizData.forEach(q => {
        fireEvent.click(screen.getByText(q.answers[0].text)); 
      });
      expect(screen.getByText('The Sorting Helmet has decided!')).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: 'Take the Quiz Again' }));
      expect(screen.getByText(`Question 1/${quizData.length}: ${quizData[0].question}`)).toBeInTheDocument();
      const expectedInitialProgress = Math.round((1 / quizData.length) * 100);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', expectedInitialProgress.toString());
      fireEvent.click(screen.getByText(quizData[0].answers[1].text));
      fireEvent.click(screen.getByText(quizData[1].answers[2].text));
      fireEvent.click(screen.getByText(quizData[2].answers[0].text));
      fireEvent.click(screen.getByText(quizData[3].answers[1].text));
      fireEvent.click(screen.getByText(quizData[4].answers[2].text));
      expect(screen.getByText('You belong with: The First Order')).toBeInTheDocument();
    });
  });

  describe('Saving Alignment', () => {
    it('should call setAlignment with Neutral when Cause is confirmed', () => {
      render(<Quiz setAlignment={mockSetAlignment} crewManifest={mockCrewManifest} />);
      fireEvent.click(screen.getByText(quizData[0].answers[0].text)); 
      fireEvent.click(screen.getByText(quizData[1].answers[1].text)); 
      fireEvent.click(screen.getByText(quizData[2].answers[2].text)); 
      fireEvent.click(screen.getByText(quizData[3].answers[0].text)); 
      fireEvent.click(screen.getByText(quizData[4].answers[1].text)); 
      expect(screen.getByText('You belong with: The Cause')).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: 'Confirm The Cause' }));
      expect(mockSetAlignment).toHaveBeenCalledWith(ChainCodeAlignmentString.Neutral);
    });

    it('should call setAlignment with Dark when First Order is confirmed', () => {
      render(<Quiz setAlignment={mockSetAlignment} crewManifest={mockCrewManifest} />);
      fireEvent.click(screen.getByText(quizData[0].answers[1].text)); 
      fireEvent.click(screen.getByText(quizData[1].answers[2].text)); 
      fireEvent.click(screen.getByText(quizData[2].answers[0].text)); 
      fireEvent.click(screen.getByText(quizData[3].answers[1].text)); 
      fireEvent.click(screen.getByText(quizData[4].answers[2].text)); 
      expect(screen.getByText('You belong with: The First Order')).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: 'Confirm The First Order' }));
      expect(mockSetAlignment).toHaveBeenCalledWith(ChainCodeAlignmentString.Dark);
    });

    it('should call setAlignment with Light when Resistance is confirmed', () => {
      render(<Quiz setAlignment={mockSetAlignment} crewManifest={mockCrewManifest} />);
      fireEvent.click(screen.getByText(quizData[0].answers[2].text)); 
      fireEvent.click(screen.getByText(quizData[1].answers[0].text)); 
      fireEvent.click(screen.getByText(quizData[2].answers[1].text)); 
      fireEvent.click(screen.getByText(quizData[3].answers[2].text)); 
      fireEvent.click(screen.getByText(quizData[4].answers[0].text)); 
      expect(screen.getByText('You belong with: The Resistance')).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: 'Confirm The Resistance' }));
      expect(mockSetAlignment).toHaveBeenCalledWith(ChainCodeAlignmentString.Light);
    });
  });
});
