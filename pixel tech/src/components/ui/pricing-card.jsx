import React from 'react';
import { cn } from '../../lib/utils';

function Card({ className, ...props }) {
	return (
		<div
			className={cn(
				'bg-[#050505] relative w-full rounded-2xl flex flex-col',
				'p-1.5 shadow-2xl',
				'border border-white/10',
				className,
			)}
			{...props}
		/>
	);
}

function Header({
	className,
	children,
	glassEffect = false,
	...props
}) {
	return (
		<div
			className={cn(
				'bg-[#0a0a0a] relative mb-3 rounded-xl border border-white/5 p-4 overflow-hidden',
				className,
			)}
			{...props}
		>
			{/* Top glass gradient */}
			{glassEffect && (
				<div
					aria-hidden="true"
					className="absolute inset-x-0 top-0 h-48 rounded-[inherit]"
					style={{
						background:
							'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 40%, rgba(0,0,0,0) 100%)',
					}}
				/>
			)}
			<div className="relative z-10">
			    {children}
			</div>
		</div>
	);
}

function Plan({ className, ...props }) {
	return (
		<div
			className={cn('mb-6 flex items-center justify-between', className)}
			{...props}
		/>
	);
}

function Description({ className, ...props }) {
	return (
		<p className={cn('text-mut text-[0.85rem] leading-snug', className)} {...props} />
	);
}

function PlanName({ className, ...props }) {
	return (
		<div
			className={cn(
				"text-white flex items-center gap-2 text-[0.95rem] font-bold [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		/>
	);
}

function Badge({ className, ...props }) {
	return (
		<span
			className={cn(
				'border-accent/40 text-accent bg-accent/10 rounded-full border px-3 py-1 text-[0.7rem] uppercase tracking-wider font-bold',
				className,
			)}
			{...props}
		/>
	);
}

function Price({ className, ...props }) {
	return (
		<div className={cn('mb-4 flex items-end gap-1', className)} {...props} />
	);
}

function MainPrice({ className, ...props }) {
	return (
		<span
			className={cn('text-3xl font-extrabold tracking-tight text-white', className)}
			{...props}
		/>
	);
}

function Period({ className, ...props }) {
	return (
		<span
			className={cn('text-mut pb-1 text-[0.8rem] font-medium', className)}
			{...props}
		/>
	);
}

function OriginalPrice({ className, ...props }) {
	return (
		<span
			className={cn(
				'text-mut mr-1 ml-auto text-[0.95rem] line-through',
				className,
			)}
			{...props}
		/>
	);
}

function Body({ className, ...props }) {
	return <div className={cn('space-y-4 p-3 flex-grow', className)} {...props} />;
}

function List({ className, ...props }) {
	return <ul className={cn('space-y-2.5', className)} {...props} />;
}

function ListItem({ className, ...props }) {
	return (
		<li
			className={cn(
				'text-mut flex items-start gap-2.5 text-[0.85rem]',
				className,
			)}
			{...props}
		/>
	);
}

function Separator({
	children = 'Everything in previous tier, plus',
	className,
	...props
}) {
	return (
		<div
			className={cn(
				'text-mut flex items-center gap-3 text-sm my-4',
				className,
			)}
			{...props}
		>
			<span className="bg-white/10 h-[1px] flex-1" />
			<span className="text-mut shrink-0 uppercase tracking-widest text-[0.65rem] font-bold">{children}</span>
			<span className="bg-white/10 h-[1px] flex-1" />
		</div>
	);
}

export {
	Card,
	Header,
	Description,
	Plan,
	PlanName,
	Badge,
	Price,
	MainPrice,
	Period,
	OriginalPrice,
	Body,
	List,
	ListItem,
	Separator,
};
