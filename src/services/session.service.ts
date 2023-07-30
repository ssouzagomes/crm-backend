import { anyid } from "anyid";
import axios from "axios";
import { SessionTypes } from "~/types/session.types";
import prisma from "./prisma";

export namespace SessionService {
	export const create = async ({ user_id, ip, device, ua, client_info }: SessionTypes.CreateSessionParams): Promise<String> => {
		const session_key = anyid().encode('Aa0').length(100).random().id()

		const { data: locationByIp } = await axios.get(`https://ipapi.co/${ip}/json/`)

		const session = await prisma.users_sessions.create({
			data: {
				user_id,
				ip,
				device,
				ua,
				active: true,
				session_key,
				client_info,
				ip_location: JSON.stringify(locationByIp)
			}
		})

		return session.session_key;
	}
}
