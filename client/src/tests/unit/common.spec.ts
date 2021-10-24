import { generateNumberOfPlayers } from '../../use/common';

describe('common composable tests', () => {
  it('number of players generated', async () => {
    const response = await generateNumberOfPlayers(2);
    expect(response).toEqual([1, 2]);
  });
});
