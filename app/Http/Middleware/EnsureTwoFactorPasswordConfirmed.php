<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\Fortify\Features;
use Symfony\Component\HttpFoundation\Response;

class EnsureTwoFactorPasswordConfirmed
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Features::optionEnabled(Features::twoFactorAuthentication(), 'confirmPassword')) {
            if (! $request->session()->has('auth.password_confirmed_at') ||
                time() - $request->session()->get('auth.password_confirmed_at') > config('auth.password_timeout', 10800)) {
                return redirect()->route('password.confirm');
            }
        }

        return $next($request);
    }
}
