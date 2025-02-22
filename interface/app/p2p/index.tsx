import { useFeatureFlag, useP2PEvents, withFeatureFlag } from '@sd/client';
import { SpacedropUI } from './Spacedrop';
import { startPairing } from './pairing';

export const SpacedropUI2 = withFeatureFlag('spacedrop', SpacedropUI);

// Entrypoint of P2P UI
export function P2P() {
	const pairingEnabled = useFeatureFlag('p2pPairing');
	useP2PEvents((data) => {
		if (data.type === 'PairingRequest' && pairingEnabled) {
			startPairing(data.id, {
				name: data.name,
				os: data.os
			});
		}
	});

	return (
		<>
			<SpacedropUI2 />
		</>
	);
}
