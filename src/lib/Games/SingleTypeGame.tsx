import { motion } from 'framer-motion';
import { selectNewGameState } from '../../store/features/new';
import { useAppSelector } from '../../store/hooks';
import { GenericStep } from './Steps';

export default function SingleTypedGame() {
  const newGameState = useAppSelector(selectNewGameState);

  const steps = newGameState.selectedTypes.map((key) => <GenericStep stepKey={key} key={key} />);
  return <motion.div className="w-full">{steps}</motion.div>;
}
