import { AnimatePresence, motion } from 'framer-motion';
import {
  selectNewGameState,
  selectTypesVisible,
  toggleTypesVisibility,
} from '../../store/features/new';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { types } from '../../utils';
import GameType from './GameType';

export default function GameSteps() {
  const typesVisibleState = useAppSelector(selectTypesVisible);
  const newGameState = useAppSelector(selectNewGameState);

  const dispatch = useAppDispatch();

  const showTypes = () => dispatch(toggleTypesVisibility(true));

  const hideTypes = () => dispatch(toggleTypesVisibility(false));

  return (
    <AnimatePresence initial={false}>
      {typesVisibleState && (
        <motion.section
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: 'auto' },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          <>
            <div className="mx-5 grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 gap-2 px-5 sm:px-1 xs:px-1">
              {types.map((type) => (
                <GameType key={type} type={type} />
              ))}
            </div>
            {!!newGameState.selectedTypes.length && (
              <motion.button
                initial={true}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0px 0px 4px dodgerblue',
                }}
                onClick={() => (typesVisibleState ? hideTypes() : showTypes())}
                type="button"
                className="flex mx-auto py-2 px-16 mt-10 mb-2 text-sm font-bold focus:outline-none rounded-full border border-indigo-200 bg-gray-100 text-indigo-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
              >
                CONTINUE
              </motion.button>
            )}
          </>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
