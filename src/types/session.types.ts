export namespace SessionTypes {
	export type CreateSessionParams = {
		user_id: number;
		ip: string;
		device: string;
		ua: string;
		client_info: string;
	}
}
