"use client";

import { COLORS } from "@/components/dummyData";
import MethodBadge from "@/components/ui/MethodBadge";



export default function EndpointGrid({
	endpoints,
	active,
	setActive,
}) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 border border-border rounded-2xl overflow-hidden bg-card">

			{endpoints.map((ep) => {
				const Icon = ep.icon;

				const isActive =
					active.name === ep.name;

				const cc =
					COLORS[ep.color];

				return (
					<button
						key={ep.name}
						onClick={() =>
							setActive(ep)
						}
						className={`p-5 border border-border text-left transition-all ${
							isActive
								? "bg-muted/40"
								: "hover:bg-muted/20"
						}`}
					>

						<div className="flex items-start gap-4">

							<div
								className={`p-3 rounded-2xl ${cc.bg}`}
							>

								<Icon
									className={`h-5 w-5 ${cc.text}`}
								/>

							</div>

							<div className="flex-1">

								<div className="flex items-center gap-2 mb-1">

									<h3 className="font-bold">
										{ep.name}
									</h3>

									<MethodBadge
										method={
											ep.method
										}
									/>

								</div>

								<p className="text-sm text-muted-foreground">
									{
										ep.description
									}
								</p>

							</div>

						</div>

					</button>
				);
			})}

		</div>
	);
}