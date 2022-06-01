import { motion } from 'framer-motion';
import { selectNewGameState } from '../../store/features/new';
import { useAppSelector } from '../../store/hooks';
import { StepFactory } from './Factories';

export default function SingleTypedGame() {
  const newGameState = useAppSelector(selectNewGameState);

  const steps = newGameState.selectedTypes.map((key) => StepFactory.makeStep(key));
  return <motion.div className="w-full">{steps}</motion.div>;
}
