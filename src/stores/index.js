import { VehicleMakeStore } from './VehicleMakeStore';
import { VehicleModelStore } from './VehicleModelStore';

export const stores = {
	VehicleMakeStore,
	VehicleModelStore,

	onChange(e) {
		e.preventDefault();
		VehicleMakeStore.search = e.target.value;
	},

	get filtered() {
		const items = VehicleMakeStore.VehicleMake.filter((item) => {
			return (
				item.name.toLowerCase().includes(VehicleMakeStore.search.toLowerCase()) ||
				item.abrv.toLowerCase().includes(VehicleMakeStore.search.toLowerCase())
			);
		});
		if (items.length) return items;
		return VehicleMakeStore.VehicleMake;
	}
};
